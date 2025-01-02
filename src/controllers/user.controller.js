import { wrapAsync } from '../utils/wrapAsync.js';

const registerUser = wrapAsync(async (req, res, next) => {
  res.status(200).json({
    status: 200,
    message: 'ok',
  });
});

export { registerUser };
