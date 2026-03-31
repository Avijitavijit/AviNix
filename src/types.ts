/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  nameEn: string;
  nameBn: string;
  price: number;
  category: string;
  image: string;
  badgeEn?: string;
  badgeBn?: string;
}

export interface Category {
  id: string;
  nameEn: string;
  nameBn: string;
  icon: string;
  image: string;
  count: string;
}

export type Language = 'en' | 'bn';
