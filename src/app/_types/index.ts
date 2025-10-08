export type Post = {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  categories: string[]; //配列！
  content: string;
  image?: string;
};

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export type Errors = Partial<FormData>;