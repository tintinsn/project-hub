export const convertDate = (date: string) => {
    const dateStr = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      month: "short", 
      year: "numeric",
    };
    const formattedDate = dateStr.toLocaleDateString('en-US', options);
    return formattedDate;
  };