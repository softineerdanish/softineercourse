import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Stats } from "../modals/Stats.js";

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return next(new ErrorHandler("all fields are mandatory", 400));

  const to = process.env.MY_MAIL;

  const subject = "Contact From Course Bundler";
  const text = `I am ${name} and my email is ${email}. \n ${message}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your message has been send",
  });
});

export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course)
    return next(new ErrorHandler("all fields are mandatory", 400));

  const to = process.env.MY_MAIL;

  const subject = "Request For a Course on CourseBundler";
  const text = `I am ${name} and my email is ${email}. \n ${course}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your Request has been send",
  });
});

export const getDashboardStats = catchAsyncError(async (req, res, next) => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

  const statsData = [];

  for (let i = 0; i < stats.length; i++) {
    statsData.push(stats[i]);
  }

  const requiredSize = 12 - stats.length;

  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      subscriptions: 0,
      views: 0,
    });
  }

  const usersCount = statsData[11].users;
  const subscriptionsCount = statsData[11].subscriptions;
  const viewsCount = statsData[11].views;

  let usersProfit = true,
    viewsProfit = true,
    subscriptionsProfit = true;
  let usersPercentage = 0,
    viewsPercentage = 0,
    subscriptionsPercentage = 0;

  if (statsData[10].users === 0) usersPercentage = usersCount * 100;
  if (statsData[10].subscriptions === 0)
    subscriptionsPercentage = subscriptionsCount * 100;
  if (statsData[10].views === 0) viewsPercentage = viewsCount * 100;
  else {
    const difference = {
      users: statsData[11].users - statsData[10].users,
      subscriptions: statsData[11].subscriptions - statsData[10].subscriptions,
      views: statsData[11].views - statsData[10].views,
    };
    usersPercentage = (difference.users / statsData[10].users) * 100;
    subscriptionsPercentage =
      (difference.subscriptions / statsData[10].subscriptions) * 100;
    viewsPercentage = (difference.views / statsData[10].views) * 100;
       
        if(usersPercentage < 0) usersProfit = false;  
        if(subscriptionsPercentage < 0) subscriptionsProfit = false;  
        if(viewsPercentage < 0) viewsProfit = false;  

}





  res.status(200).json({
    success: true,
    stats: statsData,
    usersCount,
    subscriptionsCount,
    viewsCount,

    usersPercentage,
    subscriptionsPercentage,
    viewsPercentage,

    usersProfit,
    subscriptionsProfit,
    viewsProfit,

  });
});
