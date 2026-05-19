import { Id } from "@/convex/_generated/dataModel";

export interface designProps {
    _id: Id<"designs">;
    _creationTime: number;
    thumbnail?: string | undefined;
    category?: string | undefined;
    userId: Id<"users">;
    title: string;
    json: any;
    height: number;
    width: number;
    isPro: boolean;
    isPublished: boolean;
}

export interface userProps {
  _id: Id<"users">;
  _creationTime: number;
  name?: string | undefined;
  image?: string | undefined;
  email?: string | undefined;
  emailVerificationTime?: number | undefined;
  phone?: string | undefined;
  phoneVerificationTime?: number | undefined;
  isPro?: boolean | undefined;
}
