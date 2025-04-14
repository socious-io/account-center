import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ImpactData } from 'src/core/adaptors/impact/index.types';
interface ImpactLoaderData {
  impact: ImpactData;
}
const useDetails = () => {
  const { impact: impactData } = useLoaderData() as ImpactLoaderData;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };

  return {
    data: {
      impactData,
      isExpanded,
    },
    operations: {
      handleToggle,
    },
  };
};
export default useDetails;
