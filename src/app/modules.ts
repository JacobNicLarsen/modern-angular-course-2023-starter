export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface MemeResponse {
  success: boolean;
  data: Data;
}

export interface Data {
  memes: Meme[];
}

export interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
  captions: number;
}
