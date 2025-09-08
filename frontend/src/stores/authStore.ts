import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AbilityBuilder, PureAbility } from '@casl/ability';

type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
type Subjects = 'Tour' | 'User' | 'all';
export type AppAbility = PureAbility<[Actions, Subjects]>;

type State = {
  token: string | null;
  user: { nombre: string } | null;
  ability: AppAbility;
  isAuthenticated: boolean;
};

type StoreActions = {
  setToken: (token: string) => void;
  logout: () => void;
};

const decodeToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const buildAbility = (rules: any[]) => {
  const { can, build } = new AbilityBuilder<AppAbility>(PureAbility as any);
  if (rules) {
    rules.forEach((rule) => {
      can(rule.action, rule.subject);
    });
  }
  return build();
};

const emptyAbility = buildAbility([]);

export const useAuthStore = create(
  persist<State & StoreActions>(
    (set) => ({
      token: null,
      user: null,
      ability: emptyAbility,
      isAuthenticated: false,
      setToken: (token) => {
        const payload = decodeToken(token);
        if (payload && payload.permissions) {
          const ability = buildAbility(payload.permissions);
          set({
            token,
            user: { nombre: payload.nombre },
            ability,
            isAuthenticated: true,
          });
        }
      },
      logout: () => {
        set({ token: null, user: null, ability: emptyAbility, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        setItem: (name, value) => {
          const state = JSON.parse(value);
          const newStorableState = {
            ...state.state,
            ability: state.state.ability ? state.state.ability.rules : [],
          };
          localStorage.setItem(name, JSON.stringify({ ...state, state: newStorableState }));
        },
        getItem: (name) => {
  const str = localStorage.getItem(name);
  if (!str) return null;

  const storedState = JSON.parse(str);
  const ability = buildAbility(storedState.state.ability || []);
  
  // ¡CORRECTO! Se devuelve el objeto reconstruido y funcional
  return {
    ...storedState,
    state: { ...storedState.state, ability },
  };
},
        removeItem: (name) => localStorage.removeItem(name),
      })),
    },
  ),
);