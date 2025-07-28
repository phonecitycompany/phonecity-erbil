const LoanNotificationRow = ({ notification, todaysValue }) => {

  const getDateDifference = () => {
    const today = new Date(todaysValue);

    // Assuming notification?.returning_date is a valid date string
    const returningDate = new Date(notification?.returning_date);

    // Check if returningDate is a valid date object
    if (isNaN(returningDate.getTime())) {
      console.error('Invalid returning date:', notification?.returning_date);
      return null;
    }

    // Calculate the difference in milliseconds
    const difference = returningDate.getTime() - today.getTime();

    // Calculate the difference in days
    const differenceInDays = Math.floor(difference / (1000 * 60 * 60 * 24));


    return differenceInDays;
  };

  return (
    <div className=" bg-main-transparent border-r-main-light mb-6 flex flex-col gap-2 rounded-md border-r-4 p-4 backdrop-blur-sm">
      <div>
        <p>
          {`${getDateDifference()} ڕۆژ ماوە بۆ  ${notification?.total_purchase > 0 ? "وەرگرتنەوەی" : "گەڕاندنەوەی"} قەزی `}
        </p>
        <p>
          {`( ${notification?.companies ? notification?.companies?.company_name : notification?.sellers ? notification?.sellers?.seller_name : notification?.debtor?.debtor_name} ) بە بڕی ${Math.abs(notification?.total_purchase)} $`}
        </p>
      </div>
    </div>
  );
};

export default LoanNotificationRow;
