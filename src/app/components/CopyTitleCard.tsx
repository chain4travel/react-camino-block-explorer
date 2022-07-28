import React from 'react';
import Icon from '@mdi/react';
import OutlinedContainer from 'app/components/OutlinedContainer';
import DetailsField from 'app/components/DetailsField';

export default function CopyTitleCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <OutlinedContainer transparent={false}>
      <DetailsField
        field={label}
        value={value}
        type="string"
        icon={
          <Icon
            path={icon}
            color="latestList.iconColor"
            style={{ width: '20px', height: '20px' }}
          />
        }
        allowCopy={true}
      />
    </OutlinedContainer>
  );
}
