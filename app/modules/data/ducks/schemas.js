import _reduce from 'lodash/reduce';
import { Schema, arrayOf } from 'normalizr';
import { publishTypesInfo } from 'funong-common/lib/appConstants';

export const UserSchema = new Schema('users', {
  idAttribute: 'objectId',
});
export const UsersSchema = arrayOf(UserSchema);

export const ShopSchema = new Schema('shops', {
  idAttribute: 'objectId',
});
ShopSchema.define({
  owner: UserSchema,
});
export const ShopsSchema = arrayOf(ShopSchema);

export const CategorySchema = new Schema('categories', {
  idAttribute: 'objectId',
});

export const CategoriesSchema = arrayOf(CategorySchema);

export const SpeciesSchema = new Schema('species', {
  idAttribute: 'objectId',
});
SpeciesSchema.define({
  category: CategorySchema,
});
export const SpeciesArraySchema = arrayOf(SpeciesSchema);

export const SpecificationSchema = new Schema('specifications', {
  idAttribute: 'objectId',
});
SpecificationSchema.define({
  species: SpeciesSchema,
});
export const SpecificationsSchema = arrayOf(SpecificationSchema);

export const ShopProductSchema = new Schema('shopProducts', {
  idAttribute: 'objectId',
});
ShopProductSchema.define({
  shop: ShopSchema,
  species: SpeciesSchema,
  specifications: SpecificationsSchema,
});
export const ShopProductsSchema = arrayOf(ShopProductSchema);

export const SupplyProductSchema = new Schema('supplyProducts', {
  idAttribute: 'objectId',
});
SupplyProductSchema.define({
  owner: UserSchema,
  species: SpeciesSchema,
  category: CategorySchema,
});
export const SupplyProductsSchema = arrayOf(SupplyProductSchema);

export const LogisticsProductSchema = new Schema('logisticsProducts', {
  idAttribute: 'objectId',
});
LogisticsProductSchema.define({
  owner: UserSchema,
});
export const LogisticsProductsSchema = arrayOf(LogisticsProductSchema);

export const TripProductSchema = new Schema('tripProducts', {
  idAttribute: 'objectId',
});
TripProductSchema.define({
  owner: UserSchema,
});
export const TripProductsSchema = arrayOf(TripProductSchema);

export const ProductSchemas = {
  supply: {
    schema: SupplyProductSchema,
    array: SupplyProductsSchema,
  },
  shop: {
    schema: ShopProductSchema,
    array: ShopProductsSchema,
  },
  logistics: {
    schema: LogisticsProductSchema,
    array: LogisticsProductsSchema,
  },
  trip: {
    schema: TripProductSchema,
    array: TripProductsSchema,
  },
};

export const CertSchema = new Schema('certs', {
  idAttribute: 'objectId',
});
CertSchema.define({
  owner: UserSchema,
});
export const CertsSchema = arrayOf(CertSchema);


export const CartItemSchema = new Schema('cartItems', {
  idAttribute: 'objectId',
});
CartItemSchema.define({
  shopProduct: ShopProductSchema,
  supplyProduct: SupplyProductSchema,
  owner: UserSchema,
});
export const CartItemsSchema = arrayOf(CartItemSchema);

export const CommentSchema = new Schema('comments', {
  idAttribute: 'objectId',
});
CommentSchema.define({
  shopProduct: ShopProductSchema,
  supplyProduct: SupplyProductSchema,
  logisticsProduct: LogisticsProductSchema,
  owner: UserSchema,
});
export const CommentsSchema = arrayOf(CommentSchema);

export const OrderSchema = new Schema('orders', {
  idAttribute: 'objectId',
});
OrderSchema.define({
  owner: UserSchema,
  user: UserSchema,
  shop: ShopSchema,
  agent: ShopSchema,
});
export const OrdersSchema = arrayOf(OrderSchema);

export const InquirySchema = new Schema('inquiries', {
  idAttribute: 'objectId',
});
InquirySchema.define({
  owner: UserSchema,
  category: CategorySchema,
  species: SpeciesSchema,
  agent: ShopSchema,
});
export const InquiriesSchema = arrayOf(InquirySchema);

export const BidSchema = new Schema('bids', {
  idAttribute: 'objectId',
});
BidSchema.define({
  owner: UserSchema,
  inquiry: InquirySchema,
  product: SupplyProductSchema,
});
export const BidsSchema = arrayOf(BidSchema);

export const PublishShemas = _reduce(publishTypesInfo, (result, info, key) => {
  const schema = new Schema(info.plural, {
    idAttribute: 'objectId',
  });
  schema.define({
    owner: UserSchema,
    category: CategorySchema,
    species: SpeciesSchema,
    shop: ShopSchema,
    original: schema,
  });
  return ({
    ...result,
    [key]: schema,
  });
}, {});

export const PublishesSchemas = _reduce(PublishShemas, (result, schema, key) => {
  const arraySchema = arrayOf(schema);
  return ({
    ...result,
    [key]: arraySchema,
  });
}, {});
