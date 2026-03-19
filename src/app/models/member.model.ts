export interface Member {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  role: 'admin' | 'manager' | 'contributor';
}
