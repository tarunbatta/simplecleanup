import React from 'react';
import {
  FormControlLabel,
  Checkbox,
  Stack,
  Badge,
  Divider,
} from '@mui/material';
import { CleanupState, CLEANUP_OPTIONS } from '../types/cleanup';

interface CheckboxListProps {
  checkboxes: CleanupState;
  historyCount: number;
  cookieCount: number;
  downloadCount: number;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectAll: (checked: boolean) => void;
}

const getBadgeCount = (
  id: string,
  props: Pick<
    CheckboxListProps,
    'historyCount' | 'cookieCount' | 'downloadCount'
  >,
) => {
  switch (id) {
    case 'bh':
      return props.historyCount;
    case 'co':
      return props.cookieCount;
    case 'dh':
      return props.downloadCount;
    default:
      return undefined;
  }
};

const CheckboxList: React.FC<CheckboxListProps> = ({
  checkboxes,
  historyCount,
  cookieCount,
  downloadCount,
  handleCheckboxChange,
  onSelectAll,
}) => {
  const isAllSelected = Object.values(checkboxes).every(Boolean);
  const hasSomeSelected = Object.values(checkboxes).some(Boolean);

  return (
    <Stack spacing={1}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isAllSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
            indeterminate={!isAllSelected && hasSomeSelected}
          />
        }
        label="Select All"
        sx={{
          margin: 0,
          '& .MuiFormControlLabel-label': {
            fontWeight: 'bold',
          },
        }}
      />
      <Divider sx={{ my: 1 }} />
      {Object.entries(CLEANUP_OPTIONS).map(([id, option]) => {
        const badgeCount = getBadgeCount(id, {
          historyCount,
          cookieCount,
          downloadCount,
        });

        return (
          <FormControlLabel
            key={id}
            control={
              <Checkbox
                checked={checkboxes[id as keyof CleanupState]}
                onChange={handleCheckboxChange}
                value={id}
              />
            }
            label={
              option.hasBadge && badgeCount !== undefined ? (
                <Badge badgeContent={badgeCount} color="primary">
                  {option.label}
                </Badge>
              ) : (
                option.label
              )
            }
            sx={{
              margin: 0,
              '& .MuiFormControlLabel-label': {
                width: '100%',
              },
            }}
          />
        );
      })}
    </Stack>
  );
};

export default CheckboxList;
