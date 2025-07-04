import { useRef } from 'react';
import Select, { ClearIndicatorProps, components } from 'react-select';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { SelectProps } from './index.types';

//TODO: Multi select chips not implemented
const CustomControl = (props: any) => {
  const { icon, children } = props;
  return (
    <components.Control {...props} className={styles['input']}>
      {icon && <Icon className={styles['startIcon']} name={icon} fontSize={20} color={variables.color_grey_500} />}
      {children}
    </components.Control>
  );
};

const CustomOption = (props: any) => {
  const { innerProps, label, data, value, options, selectId } = props;
  const labelValue = handleMultiValueAsync(label).isObject ? handleMultiValueAsync(label).label : label;
  const descriptionValue =
    (handleMultiValueAsync(label).isObject ? handleMultiValueAsync(label).description : data.description) || '';
  const selected = value && value.label ? value.label === label : false;
  const index = options.findIndex(o => o.value === data.value);
  return (
    <div className="px-1.5">
      <div {...innerProps} className={`${styles['option']}`} id={`${selectId}-option-${index}`}>
        {selected && <Icon name="check" fontSize={20} color={variables.color_grey_500} />}
        <div className="ml-0 mr-auto flex gap-2 items-center">
          <span style={{ marginRight: '8px' }}>{data.icon}</span>
          {labelValue} {descriptionValue && <div className={styles['description']}>{descriptionValue}</div>}
        </div>
      </div>
    </div>
  );
};

const CustomSingleValue = (props: any) => {
  const { children, data, controlClassName } = props;
  const labelValue = handleMultiValueAsync(children).isObject ? handleMultiValueAsync(children).label : children;
  const descriptionValue = handleMultiValueAsync(children).isObject
    ? handleMultiValueAsync(children).description
    : data.description;
  return (
    <components.SingleValue {...props}>
      <div className={`flex items-center ${controlClassName}`}>
        <span className="overflow-hidden whitespace-no-wrap overflow-ellipsis">{labelValue}</span>
        {descriptionValue && <div className={styles['description']}>{descriptionValue}</div>}
      </div>
    </components.SingleValue>
  );
};

const CustomClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <Icon name="x-close" fontSize={20} color={variables.color_grey_500} className="cursor-pointer" />
    </components.ClearIndicator>
  );
};
// React select in async mode doesn't send extra data to the CustomSingleValue.Doing this cause only accessed label and using label
// string to pass the data. Please refactor this if find better solution.
const handleMultiValueAsync = (value: string) => {
  if (/^\d+$/.test(value)) {
    return { isObject: false };
  }
  try {
    return { ...JSON.parse(value), isObject: true };
  } catch {
    return { isObject: false };
  }
};

const SearchDropdown: React.FC<SelectProps> = ({
  isAsync,
  creatable = false,
  hasDropdownIcon = true,
  options,
  label,
  icon,
  errors,
  id,
  border = true,
  containerClassName = '',
  controlClassName,
  ...props
}) => {
  const selectedVal = props.value || '';
  const selectRef = useRef<any>(null);
  const handleLabelClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };
  return (
    <div className={`${styles['container']} ${containerClassName}`}>
      {label && (
        <div className={styles['labelContainer']}>
          <label
            htmlFor={id}
            className={styles['label']}
            onClick={handleLabelClick}
            aria-describedby={id}
            id={`searchDropdown-${id}`}
          >
            {label}
          </label>
        </div>
      )}
      {!isAsync ? (
        <Select
          id={id}
          ref={selectRef}
          options={options}
          noOptionsMessage={() => null}
          components={{
            Option: props => <CustomOption selectId={id} {...props} value={selectedVal} />,
            Control: props => <CustomControl {...props} icon={icon} />,
            DropdownIndicator: () =>
              hasDropdownIcon && (
                <div className={styles['dropdown']}>
                  <Icon name="chevron-down" fontSize={20} color={variables.color_grey_500} />
                </div>
              ),
            SingleValue: props => <CustomSingleValue controlClassName={controlClassName} {...props} />,
            ClearIndicator: CustomClearIndicator,
          }}
          styles={{
            menuPortal: base => ({ ...base, zIndex: 9999 }),
            singleValue: provided => ({
              ...provided,
              color: variables.color_grey_900,
              fontSize: '16px',
              fontWeight: 500,
            }),

            control: (provided: any, state: any) => ({
              ...provided,
              '&:hover': '',
              border: !border
                ? 'none'
                : state.isFocused
                  ? `1px solid ${variables.color_primary_300}`
                  : `1px solid ${variables.color_grey_300}`,
              boxShadow: !border ? null : state.isFocused ? `0px 0px 0px 4px ${variables.color_primary_100}` : null,
              borderRadius: '8px',
            }),
            indicatorSeparator: () => ({ display: 'none' }),
          }}
          {...props}
          aria-labelledby="searchDropdown"
        />
      ) : creatable ? (
        <AsyncCreatableSelect
          id={id}
          cacheOptions
          defaultOptions
          ref={selectRef}
          options={options}
          components={{
            Option: props => <CustomOption {...props} value={selectedVal} selectId={id} />,
            Control: props => <CustomControl ref={selectRef} {...props} icon={icon} />,
            DropdownIndicator: () =>
              hasDropdownIcon && (
                <div className={styles['dropdown']}>
                  <Icon name="chevron-down" fontSize={20} color={variables.color_grey_500} />
                </div>
              ),
            SingleValue: CustomSingleValue,
            ClearIndicator: CustomClearIndicator,
          }}
          styles={{
            menuPortal: base => ({ ...base, zIndex: 9999 }),
            singleValue: provided => ({
              ...provided,
              color: variables.color_grey_900,
              fontSize: '16px',
              fontWeight: 500,
            }),
            control: (provided: any, state: any) => ({
              ...provided,
              '&:hover': '',
              border: !border
                ? 'none'
                : state.isFocused
                  ? `1px solid ${variables.color_primary_300}`
                  : `1px solid ${variables.color_grey_300}`,
              boxShadow: !border ? null : state.isFocused ? `0px 0px 0px 4px ${variables.color_primary_100}` : null,
              borderRadius: '8px',
              height: '44px',
            }),
            indicatorSeparator: () => ({ display: 'none' }),
          }}
          {...props}
          aria-labelledby={`searchDropdown-${id}`}
        />
      ) : (
        <AsyncSelect
          id={id}
          cacheOptions
          defaultOptions
          ref={selectRef}
          options={options}
          noOptionsMessage={() => null}
          components={{
            Option: props => <CustomOption {...props} value={selectedVal} selectId={id} />,
            Control: props => <CustomControl {...props} icon={icon} />,
            DropdownIndicator: () =>
              hasDropdownIcon && (
                <div className={styles['dropdown']}>
                  <Icon name="chevron-down" fontSize={20} color={variables.color_grey_500} />
                </div>
              ),
            SingleValue: CustomSingleValue,
            ClearIndicator: CustomClearIndicator,
          }}
          styles={{
            menuPortal: base => ({ ...base, zIndex: 9999 }),
            singleValue: provided => ({
              ...provided,
              color: variables.color_grey_900,
              fontSize: '16px',
              fontWeight: 500,
            }),

            control: (provided: any, state: any) => ({
              ...provided,
              '&:hover': '',
              border: !border
                ? 'none'
                : state.isFocused
                  ? `1px solid ${variables.color_primary_300}`
                  : `1px solid ${variables.color_grey_300}`,
              boxShadow: !border ? null : state.isFocused ? `0px 0px 0px 4px ${variables.color_primary_100}` : null,
              borderRadius: '8px',
            }),
            indicatorSeparator: () => ({ display: 'none' }),
          }}
          {...props}
          aria-labelledby={`searchDropdown-${id}`}
        />
      )}
      {errors &&
        errors.map((e, index) => (
          <p key={index} className={`${styles['errorMsg']} ${styles['msg']}`}>
            {e}
          </p>
        ))}
    </div>
  );
};

export default SearchDropdown;
