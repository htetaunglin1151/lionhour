import { config } from './config.js';
import { buildings } from './data.js';

export const categoryFor = id => config.categories.find(category => category.id === id);
export function filterBuildings(category, status, records = buildings) {
  const filter = config.filters.find(item => item.id === status);
  if (!filter) throw new Error('Unknown status filter');
  return records.filter(building => building.category === category && filter.statuses.includes(building.status));
}
export function canVote(building) {
  return Boolean(building && categoryFor(building.category)?.voting);
}
export function stateFromSearch(search) {
  const params = new URLSearchParams(search);
  const pick = (key, choices, fallback) => choices.some(choice => choice.id === params.get(key)) ? params.get(key) : fallback;
  const category = pick('category', config.categories, config.defaultCategory);
  const view = categoryFor(category).menus ? pick('view', config.views, config.defaultView) : config.defaultView;
  const status = pick('status', config.filters, config.defaultFilter);
  const expanded = params.get('expanded');
  return {
    category, view, status,
    meal:pick('meal', config.meals, config.defaultMeal),
    expanded:filterBuildings(category, status).some(building => building.id === expanded) ? expanded : null
  };
}
export function searchFromState(state) {
  const params = new URLSearchParams({ category:state.category, view:state.view, status:state.status });
  if (state.view === 'menu') params.set('meal', state.meal);
  if (state.expanded && state.view === 'hours') params.set('expanded', state.expanded);
  return '?' + params.toString();
}
