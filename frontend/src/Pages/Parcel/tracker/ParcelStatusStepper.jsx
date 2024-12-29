import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Stepper from '@mui/joy/Stepper';
import Typography, { typographyClasses } from '@mui/joy/Typography';
import * as React from 'react';




export default function ParcelStatusStepper({ currentStatus }) {
  // Define the status list
  const statuses = [
    'created',
    'in review',
    'pending',
    'approved',
    'assigned',
    'pickedup',
    'delivered',
    'cancelled'
  ];

  function formatDateTime(isoDateString) {
    const date = new Date(isoDateString);

    const options = {
      weekday: 'long', // "Monday"
      year: 'numeric', // "2024"
      month: 'long', // "November"
      day: 'numeric', // "24"
      hour: '2-digit', // "06"
      minute: '2-digit', // "15"
      second: '2-digit', // "09"
    //   timeZoneName: 'short', // "GMT" or "UTC"
    };

    // Format the date using Intl.DateTimeFormat
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  function statusMessage(status){

      return  <Typography level="body2">
          {status ==='created'?formatDateTime(currentStatus.createdAt):'Done by Admin'}
        </Typography>

  }

  // Determine the current step index based on the currentStatus prop
  const currentStepIndex = statuses.indexOf(currentStatus?.status);

  return (
    <Stepper
    orientation="vertical"
    sx={(theme) => ({
      '--Stepper-verticalGap': '2.5rem',
      '--StepIndicator-size': '2.5rem',
      '--Step-gap': '1rem',
      '--Step-connectorInset': '0.5rem',
      '--Step-connectorRadius': '1rem',
      '--Step-connectorThickness': '4px',
      '--joy-palette-success-solidBg': 'var(--joy-palette-success-400)',
      [`& .${stepClasses.completed}`]: {
        '&::after': { bgcolor: 'success.solidBg' },
      },
      [`& .${stepClasses.active}`]: {
        [`& .${stepIndicatorClasses.root}`]: {
          border: '4px solid',
          borderColor: '#fff',
          boxShadow: `0 0 0 1px ${theme.vars.palette.primary[500]}`,
        },
      },
      [`& .${stepClasses.disabled} *`]: {
        color: 'neutral.softDisabledColor',
      },
      [`& .${typographyClasses['title-sm']}`]: {
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontSize: '10px',
      },
    })}
  >
    {statuses.map((status, index) => {
      const isCompleted = index <= currentStepIndex;
      const isActive = index === currentStepIndex+1;
      const isDisabled = index > currentStepIndex;

      // Define the color based on the status
      let indicatorColor = 'primary'; // Default to primary for active steps
      if ( status === 'cancelled') {
        indicatorColor = 'danger'; // Set red color for canceled status
      } else if (isCompleted) {
        indicatorColor = 'success'; // Set green for completed steps
      }

      return (
        <Step
          key={status}
          completed={isCompleted}
          active={isActive}
          disabled={isDisabled}
          indicator={
            isCompleted ? (
              <StepIndicator variant="solid" color={indicatorColor}>
                {status === 'cancelled'?<CloseRoundedIcon/>:<CheckRoundedIcon />}
              </StepIndicator>
            ) : isActive ? (
              <StepIndicator variant="solid" color={indicatorColor}>
                <AppRegistrationRoundedIcon />
              </StepIndicator>
            ) : (
              <StepIndicator>{index + 1}</StepIndicator>
            )
          }
        >
          <div>
            <Typography level="title-sm">{`Step ${index + 1}`}</Typography>
            {status.replace(/_/g, ' ').toUpperCase()} {/* Display status in uppercase */}
          </div>
           {/* Display custom data based on the current step */}
           <div style={{ marginTop: '10px', paddingLeft: '10px' }}>
              {/* You can also add other dynamic content here, for example, showing more parcel details */}
              {isCompleted && statusMessage(currentStatus.status)}
            </div>
        </Step>
      );
    })}
  </Stepper>

  );
}
