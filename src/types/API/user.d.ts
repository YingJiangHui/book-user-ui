namespace API {
  namespace User {
    type Role = API.Role.RoleType;
    type Current = {
      id: number;
      email: string;
      roles: Role[];
      createdAt: string;
      defaultTimes: number
    };
    type Instance = {
      id: number;
      email: string;
      roles: API.Role.Instance[];
      libraryIds: number[];
    };
  }
}
