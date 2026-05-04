import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

// ==================== Notion DB 컬럼 상수 ====================

export const NOTION_PROPERTY = {
  TITLE: "Title",
  TAGS: "Tags",
  PUBLISHED_DATE: "Published Date",
  STATUS: "Status",
  DESCRIPTION: "Description",
  FEATURED: "Featured",
} as const;

// ==================== Notion API 응답 타입 (먼저 정의) ====================

export type NotionBlock = BlockObjectResponse | PartialBlockObjectResponse;
export type RichTextList = RichTextItemResponse[];

export type SupportedBlockType =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "quote"
  | "code"
  | "image"
  | "divider"
  | "callout"
  | "toggle"
  | "to_do"
  | "table"
  | "table_row";

// ==================== 도메인 타입 ====================

export type PostStatus = "초안" | "작성중" | "발행됨";

export type ColorTheme =
  | "blue"
  | "purple"
  | "green"
  | "orange"
  | "rose"
  | "cyan"
  | "yellow";

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string;
  count: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  count: number;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  tags: Tag[];
  category?: Category;
  publishedDate: string | null;
  modifiedDate: string;
  status: PostStatus;
  featured: boolean;
  coverImage: string | null;
  notionPageId: string;
}

export interface PostDetail extends Post {
  blocks: NotionBlock[];
}

export interface PostSlideData {
  id: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  slug: string;
  colorTheme: ColorTheme;
  index: number;
}

// ==================== 페이지네이션 및 필터 타입 ====================

export interface PaginationParams {
  pageSize?: number;
  startCursor?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  hasMore: boolean;
  nextCursor: string | null;
}

export interface PostFilterParams {
  category?: string;
  tag?: string;
  query?: string;
  status?: PostStatus;
  featured?: boolean;
}

export type SortDirection = "ascending" | "descending";

export interface PostSortParams {
  property: "Published Date";
  direction: SortDirection;
}

export interface GetPostsParams extends PaginationParams, PostFilterParams {
  sort?: PostSortParams;
}

// ==================== Admin CRUD 타입 ====================

export interface PostCreateInput {
  title: string;
  description?: string;
  tags?: string[];
  status: PostStatus;
  publishedDate?: string;
  content?: string;
}

export type PostUpdateInput = Partial<PostCreateInput>;
