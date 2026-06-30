import * as React from 'react';
import CircularProgress, {
   type CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function CircularProgressWithLabel(
   props: CircularProgressProps & { value: number },
) {
   
   const value = props.value < 0 ? 0 : props.value;


   return (
      <Box
         sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
         }}
      >
         <CircularProgress
            variant="determinate"
            aria-label="Percent of macronutrient consumed"
            size={100}
            color={
               value > 110
                  ? 'error'
                  : value > 100
                    ? 'warning'
                    : 'success'
            }
            thickness={4}
            {...props}
            value={Math.min(value, 100)}
            sx={{
               '& .MuiCircularProgress-circle': {
                  transition: 'stroke-dashoffset 0.3s ease-out',
               },
               ...props.sx,
            }}
         />

         <Box
            sx={{
               top: 0,
               left: 0,
               bottom: 0,
               right: 0,
               position: 'absolute',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            <Typography
               variant="caption"
               component="div"
               sx={{
                  color: 'text.secondary',
                  fontSize: '18px',
               }}
            >
               {`${Math.round(props.value)}%`}
            </Typography>
         </Box>
      </Box>
   );
}

export default function CircularWithValueLabel({
   currentValue,
}: {
   currentValue: number;
}) {
   const [progress, setProgress] = React.useState(0);

   React.useEffect(() => {
      const target = Math.max(0, currentValue);
      const duration = 2200;

      let frameId: number;
      const startValue = progress;
      const startTime = performance.now();

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const animate = (currentTime: number) => {
         const elapsed = currentTime - startTime;
         const t = Math.min(elapsed / duration, 1);
         const eased = easeOutCubic(t);

         const nextValue =
            startValue + (target - startValue) * eased;

         setProgress(nextValue);

         if (t < 1) {
            frameId = requestAnimationFrame(animate);
         }
      };

      frameId = requestAnimationFrame(animate);

      return () => {
         cancelAnimationFrame(frameId);
      };
   }, [currentValue]);

   return <CircularProgressWithLabel value={progress} />;
}