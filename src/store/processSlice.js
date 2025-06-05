// store/processSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step1Data: { id: 2 },
  step2Data: {},
  step3Data: {},
  step4Data: {},
};

const processSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    setStep1Data: (state, action) => {
      state.step1Data = action.payload;
    },
    setStep2Data: (state, action) => {
      state.step2Data = action.payload;
    },
    setStep3Data: (state, action) => {
      state.step3Data = action.payload;
    },
    setStep4Data: (state, action) => {

      state.step4Data = action.payload;
    },

    resetProcess: () => initialState,
  },
});

export const {
  setStep1Data,
  setStep2Data,
  setStep3Data,
  setStep4Data,
  setStep5Data,
  resetProcess,
} = processSlice.actions;
export default processSlice.reducer;
