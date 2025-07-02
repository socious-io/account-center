import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity, uploadMediaWithProgressAdaptor, verifyOrganizationAdaptor } from 'src/core/adaptors';
import { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

import { FileState } from './index.types';

export const useKYB = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const identities = useSelector<RootState, CurrentIdentity[] | undefined>(state => state.identity.entities) || [];
  const currentIdentity = identities.find(identity => identity.current);
  const currentIdentityStatus = currentIdentity?.verificationStatus || 'NOT_ACTIVE';
  const currentIdentityVerified = currentIdentity?.verified;
  const organizationId = currentIdentity?.id;
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const files = fileStates.map(fileState => ({ file: fileState.file, id: fileState.id }));
  const progressValues = fileStates.reduce((acc, { id, progress }) => {
    acc[id] = progress;
    return acc;
  }, {});
  const uploadedErrors = fileStates.reduce((acc, { id, error }) => {
    acc[id] = error;
    return acc;
  }, {});

  const updateFileState = (file: File, updates: Partial<Omit<FileState, 'file'>>) => {
    setFileStates(prev => prev.map(f => (f.file === file ? { ...f, ...updates } : f)));
  };

  const onDropFiles = async (newFiles: File[]) => {
    setError('');
    const newFileStates = newFiles.map((file, index) => ({
      id: `${fileStates.length + index}`,
      file,
      error: false,
      progress: 0,
    }));
    setFileStates(prev => [...prev, ...newFileStates]);

    const uploadPromises = newFiles.map(file =>
      uploadMediaWithProgressAdaptor(file, (progress: number) => {
        updateFileState(file, { progress });
      }),
    );
    const results = await Promise.all(uploadPromises);
    results.forEach((result, index) => {
      const file = newFiles[index];
      const { error, data } = result || {};
      const resultId = data?.id || '';
      if (error) {
        updateFileState(file, { error: true });
      } else if (resultId) {
        updateFileState(file, { id: resultId });
      }
    });
  };

  const onDeleteFiles = (fileId: string) => {
    setFileStates(prev => prev.filter(f => f.id !== fileId));
  };

  const onSend = async () => {
    if (!organizationId) return;
    setError('');
    setLoading(true);
    const fileIds = fileStates.map(file => file.id).filter(Boolean);
    const { error, data } = await verifyOrganizationAdaptor(organizationId, fileIds);
    if (error) setError(error);
    if (data) {
      const updatedIdentity = identities.map(identity =>
        identity.id === currentIdentity.id
          ? {
              ...identity,
              verificationStatus: data.status,
            }
          : identity,
      );
      dispatch(setIdentityList(updatedIdentity));
      setOpenSuccessModal(true);
    }
    setLoading(false);
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    navigate('/');
  };

  return {
    data: {
      status: currentIdentityStatus,
      verified: currentIdentityVerified,
      files,
      progressValues,
      uploadedErrors,
      error,
      loading,
      openSuccessModal,
    },
    operations: {
      onDropFiles,
      onDeleteFiles,
      onSend,
      handleCloseSuccessModal,
    },
  };
};
