import category from './category'
import products from './products'
import blockContent from './blockContent'
import {user, account} from 'next-auth-sanity/schemas'

export const schemaTypes = [category, products, blockContent, user, account]
