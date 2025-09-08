import React from 'react';
import { useAuthStore, type AppAbility } from '../stores/authStore';

type CanProps = {
  perform: Parameters<AppAbility['can']>[0];
  on: Parameters<AppAbility['can']>[1];
  children: React.ReactNode;
};

export const Can = ({ perform, on, children }: CanProps) => {
  const ability = useAuthStore((state) => state.ability);

  if (ability?.can(perform, on)) {
    return <>{children}</>;
  }

  return null;
};