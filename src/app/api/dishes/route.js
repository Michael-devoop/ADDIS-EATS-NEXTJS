import { NextResponse } from "next/server";
import { getDishes } from "@/lib/dishes";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");

  let allDishes = await getDishes();

  // 1. Filter by category if specified and not "All"
  if (category && category !== "All") {
    allDishes = allDishes.filter(
      (d) => d.category.toLowerCase() === category.toLowerCase()
    );
  }

  // 2. Filter by search query if provided
  if (search) {
    const term = search.toLowerCase().trim();
    allDishes = allDishes.filter(
      (d) =>
        d.name.toLowerCase().includes(term) ||
        d.category.toLowerCase().includes(term)
    );
  }

  // 3. Paginate if page parameter is present
  if (pageParam !== null) {
    const page = Math.max(1, parseInt(pageParam, 10) || 1);
    const limit = Math.max(1, parseInt(limitParam, 10) || 4);
    const total = allDishes.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    const paginated = allDishes.slice(start, start + limit);

    return NextResponse.json(
      {
        dishes: paginated,
        total,
        page,
        totalPages,
      },
      { status: 200 }
    );
  }

  return NextResponse.json(allDishes, { status: 200 });
}