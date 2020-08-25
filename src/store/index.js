import { configureStore } from '@reduxjs/toolkit';

import systemReducer from './ducks/system';
import authReducer from './ducks/auth';
import naversReducer from './ducks/navers';

export default configureStore({
  reducer: {
    system: systemReducer,
    auth: authReducer,
    navers: naversReducer
  }
});