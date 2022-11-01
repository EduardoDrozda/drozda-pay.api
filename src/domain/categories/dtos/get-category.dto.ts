class GetCategoryDto {
  readonly id: number;
  readonly name: string;
  readonly description: string;

  constructor(partial: Partial<GetCategoryDto>) {
    Object.assign(this, partial);
  }
}

export { GetCategoryDto };
