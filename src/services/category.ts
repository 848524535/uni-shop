import type { CategoryTopItem } from '@/types/category'
import { http } from '@/utils/http'
//一级分类接口
export const getCategoryTopAPI = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
