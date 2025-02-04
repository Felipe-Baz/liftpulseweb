export const formatTimeToMinSec = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  export const parseMinSecToSeconds = (timeString: string): number => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return (minutes * 60) + (seconds || 0);
  };
  
  export const formatMinSecInput = (value: string): string => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Ensure we have at most 4 digits
    const limitedDigits = digits.slice(0, 4);
    
    // Add leading zeros if necessary
    const paddedDigits = limitedDigits.padStart(4, '0');
    
    // Split into minutes and seconds
    const minutes = paddedDigits.slice(0, 2);
    const seconds = paddedDigits.slice(2);
    
    // Ensure seconds are valid (less than 60)
    const validSeconds = Math.min(parseInt(seconds), 59).toString().padStart(2, '0');
    
    return `${minutes}:${validSeconds}`;
  };
  