import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid/non-secure';
export const AVATAR_KEYS = ['a1', 'a2', 'a3'];
export const avatarByKey = (key) => {
  switch (key) {
    case 'a1':
      return require('../assets/images/avatar1.png');
    case 'a2':
      return require('../assets/images/avatar2.png');
    case 'a3':
      return require('../assets/images/avatar3.png');
    default:
      return require('../assets/images/avatar1.png');
  }
};
// Первоначальные мок-данные — перенесём сюда (ключи аватаров!)
const initialState = {
  list: [
    { id: '1', name: 'Grand Pops',      birthDate: '1940-03-27', phone: '', avatarKey: 'a1' },
    { id: '2', name: 'Nimnomiobong...', birthDate: '2002-04-02', phone: '', avatarKey: 'a2' },
    { id: '3', name: 'Chisom Anizor',   birthDate: '2001-04-18', phone: '', avatarKey: 'a3' },
    { id: '4', name: 'Dima Tihtey',     birthDate: '2001-08-20', phone: '', avatarKey: 'a1' },
    { id: '5', name: 'Dima Solic',      birthDate: '2001-08-21', phone: '', avatarKey: 'a2' }, // ← было 4
  ],
};

const BirthdaysSlice = createSlice({
  name: 'birthdays',
  initialState,
  reducers: {
    addBirthday: {
      prepare({ name, phone, birthDate, avatarKey = 'a1' }) {
        return { payload: { id: nanoid(), name, phone, birthDate, avatarKey } };
      },
      reducer(state, action) {
        state.list.push(action.payload);
      },
    },
    updateBirthday(state, action) {
      const { id, patch } = action.payload;
      const idx = state.list.findIndex((x) => x.id === id);
      if (idx !== -1) state.list[idx] = { ...state.list[idx], ...patch };
    },
    removeBirthday(state, action) {
      const id = action.payload;
      state.list = state.list.filter((x) => x.id !== id);
    },
  },
});
export const { addBirthday, updateBirthday, removeBirthday } =
  BirthdaysSlice.actions;
export default BirthdaysSlice.reducer;
