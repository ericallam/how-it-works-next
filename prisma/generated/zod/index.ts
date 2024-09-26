import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','createdAt','updatedAt']);

export const VideoScalarFieldEnumSchema = z.enum(['id','url','processedUrl','createdAt','updatedAt','userId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// VIDEO SCHEMA
/////////////////////////////////////////

export const VideoSchema = z.object({
  id: z.string().cuid(),
  url: z.string(),
  processedUrl: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
})

export type Video = z.infer<typeof VideoSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  videos: z.union([z.boolean(),z.lazy(() => VideoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  videos: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  videos: z.union([z.boolean(),z.lazy(() => VideoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VIDEO
//------------------------------------------------------

export const VideoIncludeSchema: z.ZodType<Prisma.VideoInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const VideoArgsSchema: z.ZodType<Prisma.VideoDefaultArgs> = z.object({
  select: z.lazy(() => VideoSelectSchema).optional(),
  include: z.lazy(() => VideoIncludeSchema).optional(),
}).strict();

export const VideoSelectSchema: z.ZodType<Prisma.VideoSelect> = z.object({
  id: z.boolean().optional(),
  url: z.boolean().optional(),
  processedUrl: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  videos: z.lazy(() => VideoListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  videos: z.lazy(() => VideoOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  videos: z.lazy(() => VideoListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VideoWhereInputSchema: z.ZodType<Prisma.VideoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VideoWhereInputSchema),z.lazy(() => VideoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VideoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VideoWhereInputSchema),z.lazy(() => VideoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  processedUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const VideoOrderByWithRelationInputSchema: z.ZodType<Prisma.VideoOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  processedUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const VideoWhereUniqueInputSchema: z.ZodType<Prisma.VideoWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => VideoWhereInputSchema),z.lazy(() => VideoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VideoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VideoWhereInputSchema),z.lazy(() => VideoWhereInputSchema).array() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  processedUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const VideoOrderByWithAggregationInputSchema: z.ZodType<Prisma.VideoOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  processedUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VideoCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VideoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VideoMinOrderByAggregateInputSchema).optional()
}).strict();

export const VideoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VideoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VideoScalarWhereWithAggregatesInputSchema),z.lazy(() => VideoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VideoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VideoScalarWhereWithAggregatesInputSchema),z.lazy(() => VideoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  processedUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  videos: z.lazy(() => VideoCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  videos: z.lazy(() => VideoUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videos: z.lazy(() => VideoUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videos: z.lazy(() => VideoUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VideoCreateInputSchema: z.ZodType<Prisma.VideoCreateInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  processedUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutVideosInputSchema)
}).strict();

export const VideoUncheckedCreateInputSchema: z.ZodType<Prisma.VideoUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  processedUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const VideoUpdateInputSchema: z.ZodType<Prisma.VideoUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  processedUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutVideosNestedInputSchema).optional()
}).strict();

export const VideoUncheckedUpdateInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  processedUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VideoCreateManyInputSchema: z.ZodType<Prisma.VideoCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  processedUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const VideoUpdateManyMutationInputSchema: z.ZodType<Prisma.VideoUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  processedUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VideoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  processedUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const VideoListRelationFilterSchema: z.ZodType<Prisma.VideoListRelationFilter> = z.object({
  every: z.lazy(() => VideoWhereInputSchema).optional(),
  some: z.lazy(() => VideoWhereInputSchema).optional(),
  none: z.lazy(() => VideoWhereInputSchema).optional()
}).strict();

export const VideoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VideoOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const VideoCountOrderByAggregateInputSchema: z.ZodType<Prisma.VideoCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  processedUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VideoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VideoMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  processedUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VideoMinOrderByAggregateInputSchema: z.ZodType<Prisma.VideoMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  processedUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const VideoCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.VideoCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutUserInputSchema),z.lazy(() => VideoCreateWithoutUserInputSchema).array(),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VideoCreateOrConnectWithoutUserInputSchema),z.lazy(() => VideoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VideoCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VideoUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.VideoUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutUserInputSchema),z.lazy(() => VideoCreateWithoutUserInputSchema).array(),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VideoCreateOrConnectWithoutUserInputSchema),z.lazy(() => VideoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VideoCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const VideoUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.VideoUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutUserInputSchema),z.lazy(() => VideoCreateWithoutUserInputSchema).array(),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VideoCreateOrConnectWithoutUserInputSchema),z.lazy(() => VideoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VideoUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => VideoUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VideoCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VideoUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => VideoUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VideoUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => VideoUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VideoScalarWhereInputSchema),z.lazy(() => VideoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VideoUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutUserInputSchema),z.lazy(() => VideoCreateWithoutUserInputSchema).array(),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VideoCreateOrConnectWithoutUserInputSchema),z.lazy(() => VideoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VideoUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => VideoUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VideoCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VideoUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => VideoUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VideoUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => VideoUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VideoScalarWhereInputSchema),z.lazy(() => VideoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutVideosInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutVideosInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutVideosInputSchema),z.lazy(() => UserUncheckedCreateWithoutVideosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVideosInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const UserUpdateOneRequiredWithoutVideosNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutVideosNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutVideosInputSchema),z.lazy(() => UserUncheckedCreateWithoutVideosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVideosInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutVideosInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutVideosInputSchema),z.lazy(() => UserUpdateWithoutVideosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVideosInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const VideoCreateWithoutUserInputSchema: z.ZodType<Prisma.VideoCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  processedUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const VideoUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.VideoUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  processedUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const VideoCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.VideoCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => VideoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VideoCreateWithoutUserInputSchema),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const VideoCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.VideoCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => VideoCreateManyUserInputSchema),z.lazy(() => VideoCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const VideoUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.VideoUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => VideoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VideoUpdateWithoutUserInputSchema),z.lazy(() => VideoUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => VideoCreateWithoutUserInputSchema),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const VideoUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.VideoUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => VideoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VideoUpdateWithoutUserInputSchema),z.lazy(() => VideoUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const VideoUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.VideoUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => VideoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VideoUpdateManyMutationInputSchema),z.lazy(() => VideoUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const VideoScalarWhereInputSchema: z.ZodType<Prisma.VideoScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VideoScalarWhereInputSchema),z.lazy(() => VideoScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VideoScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VideoScalarWhereInputSchema),z.lazy(() => VideoScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  processedUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutVideosInputSchema: z.ZodType<Prisma.UserCreateWithoutVideosInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutVideosInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutVideosInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutVideosInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutVideosInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutVideosInputSchema),z.lazy(() => UserUncheckedCreateWithoutVideosInputSchema) ]),
}).strict();

export const UserUpsertWithoutVideosInputSchema: z.ZodType<Prisma.UserUpsertWithoutVideosInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutVideosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVideosInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutVideosInputSchema),z.lazy(() => UserUncheckedCreateWithoutVideosInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutVideosInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutVideosInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutVideosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVideosInputSchema) ]),
}).strict();

export const UserUpdateWithoutVideosInputSchema: z.ZodType<Prisma.UserUpdateWithoutVideosInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutVideosInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutVideosInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VideoCreateManyUserInputSchema: z.ZodType<Prisma.VideoCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  processedUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const VideoUpdateWithoutUserInputSchema: z.ZodType<Prisma.VideoUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  processedUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VideoUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  processedUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VideoUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  processedUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const VideoFindFirstArgsSchema: z.ZodType<Prisma.VideoFindFirstArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereInputSchema.optional(),
  orderBy: z.union([ VideoOrderByWithRelationInputSchema.array(),VideoOrderByWithRelationInputSchema ]).optional(),
  cursor: VideoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VideoScalarFieldEnumSchema,VideoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VideoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VideoFindFirstOrThrowArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereInputSchema.optional(),
  orderBy: z.union([ VideoOrderByWithRelationInputSchema.array(),VideoOrderByWithRelationInputSchema ]).optional(),
  cursor: VideoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VideoScalarFieldEnumSchema,VideoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VideoFindManyArgsSchema: z.ZodType<Prisma.VideoFindManyArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereInputSchema.optional(),
  orderBy: z.union([ VideoOrderByWithRelationInputSchema.array(),VideoOrderByWithRelationInputSchema ]).optional(),
  cursor: VideoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VideoScalarFieldEnumSchema,VideoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VideoAggregateArgsSchema: z.ZodType<Prisma.VideoAggregateArgs> = z.object({
  where: VideoWhereInputSchema.optional(),
  orderBy: z.union([ VideoOrderByWithRelationInputSchema.array(),VideoOrderByWithRelationInputSchema ]).optional(),
  cursor: VideoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VideoGroupByArgsSchema: z.ZodType<Prisma.VideoGroupByArgs> = z.object({
  where: VideoWhereInputSchema.optional(),
  orderBy: z.union([ VideoOrderByWithAggregationInputSchema.array(),VideoOrderByWithAggregationInputSchema ]).optional(),
  by: VideoScalarFieldEnumSchema.array(),
  having: VideoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VideoFindUniqueArgsSchema: z.ZodType<Prisma.VideoFindUniqueArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereUniqueInputSchema,
}).strict() ;

export const VideoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VideoFindUniqueOrThrowArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const VideoCreateArgsSchema: z.ZodType<Prisma.VideoCreateArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  data: z.union([ VideoCreateInputSchema,VideoUncheckedCreateInputSchema ]),
}).strict() ;

export const VideoUpsertArgsSchema: z.ZodType<Prisma.VideoUpsertArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereUniqueInputSchema,
  create: z.union([ VideoCreateInputSchema,VideoUncheckedCreateInputSchema ]),
  update: z.union([ VideoUpdateInputSchema,VideoUncheckedUpdateInputSchema ]),
}).strict() ;

export const VideoCreateManyArgsSchema: z.ZodType<Prisma.VideoCreateManyArgs> = z.object({
  data: z.union([ VideoCreateManyInputSchema,VideoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VideoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VideoCreateManyAndReturnArgs> = z.object({
  data: z.union([ VideoCreateManyInputSchema,VideoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VideoDeleteArgsSchema: z.ZodType<Prisma.VideoDeleteArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereUniqueInputSchema,
}).strict() ;

export const VideoUpdateArgsSchema: z.ZodType<Prisma.VideoUpdateArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  data: z.union([ VideoUpdateInputSchema,VideoUncheckedUpdateInputSchema ]),
  where: VideoWhereUniqueInputSchema,
}).strict() ;

export const VideoUpdateManyArgsSchema: z.ZodType<Prisma.VideoUpdateManyArgs> = z.object({
  data: z.union([ VideoUpdateManyMutationInputSchema,VideoUncheckedUpdateManyInputSchema ]),
  where: VideoWhereInputSchema.optional(),
}).strict() ;

export const VideoDeleteManyArgsSchema: z.ZodType<Prisma.VideoDeleteManyArgs> = z.object({
  where: VideoWhereInputSchema.optional(),
}).strict() ;