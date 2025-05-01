type CommonFields = {
  username: string;
  email: string;
};

export type UserSchema = CommonFields & {
  firstName: string;
  lastName: string;
};

export type OrganizationSchema = CommonFields & {
  name: string;
};

export type Form = UserSchema | OrganizationSchema;
