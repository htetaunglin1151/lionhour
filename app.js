import { config } from './config.js';
import { buildings, menus } from './data.js';
import { categoryFor, filterBuildings, canVote, stateFromSearch, searchFromState } from './model.js';

const app = document.querySelector('#app');
const announcement = document.querySelector('#announcement');
let state = stateFromSearch(location.search);
const votes = new Set();
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let currentTransition;
let scheduleTransition;
let interactionVersion = 0;
const escape = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const text = (key, replacements = {}) => Object.entries(replacements).reduce((value, [name, replacement]) => value.replaceAll(`{${name}}`, replacement), config.copy[key]);
const icon = (name, extra = '') => `<span class="icon ${extra}" aria-hidden="true">${escape(name)}</span>`;
const badge = building => `<span class="badge" data-status="${building.status}">${escape(config.statuses[building.status].label)}</span>`;

function masthead() {
  return `<header class="masthead">
    <div class="statusbar" aria-hidden="true"><span class="statusbar-time">${config.statusbarTime}</span><span class="statusbar-icons">${icon(config.icons.signal)}${icon(config.icons.wifi)}${icon(config.icons.battery, 'battery')}</span></div>
    <div class="brand"><p class="wordmark">${escape(config.brand)}</p><time class="date" datetime="${config.dateISO}">${escape(config.dateLabel)}</time></div>
    <nav class="category-nav" aria-label="${escape(config.copy.navigation)}">${config.categories.map(category => `<button type="button" class="category-button" data-action="category" data-value="${category.id}" ${state.category === category.id ? 'aria-current="page"' : ''}>${icon(category.icon)}${escape(category.label)}</button>`).join('')}</nav>
  </header>`;
}
function toolbar() {
  const category = categoryFor(state.category);
  return `<div class="toolbar"><h1 class="page-title">${escape(category.title)}</h1><label class="filter-wrap"><span class="sr-only">${escape(config.copy.statusFilter)}</span><select id="status-filter" aria-label="${escape(config.copy.statusFilter)}">${config.filters.map(filter => `<option value="${filter.id}" ${state.status === filter.id ? 'selected' : ''}>${escape(filter.label)}</option>`).join('')}</select>${icon(config.icons.filterArrow)}</label></div>
    ${category.menus ? `<div class="segmented" role="group" aria-label="${escape(config.copy.viewLabel)}">${config.views.map(view => `<button type="button" class="segment" data-action="view" data-value="${view.id}" aria-pressed="${state.view === view.id}">${escape(view.label)}</button>`).join('')}</div>` : ''}`;
}
function weeklyHours(building) {
  return `<dl class="weekly-hours" id="week-${building.id}" aria-label="${escape(text('scheduleLabel', { name: building.name }))}">${config.days.map((day, index) => `<div class="day" data-today="${index === config.todayIndex}"><dt>${escape(day)}${index === config.todayIndex ? ` - ${escape(config.copy.today)}` : ''}</dt><dd>${escape(building.week[index] || config.copy.closed)}</dd></div>`).join('')}</dl>`;
}
function buildingRow(building) {
  const expanded = state.expanded === building.id;
  const selected = votes.has(building.id);
  const label = escape(text('scheduleLabel', { name: building.name }));
  return `<article class="building" data-building="${building.id}" data-status="${building.status}"><div class="building-summary"><div class="building-heading"><h2><button type="button" data-action="expand" data-value="${building.id}" aria-expanded="${expanded}" aria-controls="week-${building.id}">${escape(building.name)}</button></h2><p class="hours-label">${escape(building.hours)}</p></div><div class="row-actions">${badge(building)}${canVote(building) ? `<button type="button" class="vote" data-action="vote" data-value="${building.id}" aria-pressed="${selected}" aria-label="${escape(text(selected ? 'removeVote' : 'voteFor', { name:building.name }))}">${escape(config.copy[selected ? 'voted' : 'vote'])}</button>` : ''}<button type="button" class="disclosure" data-action="expand" data-value="${building.id}" aria-label="${label}" aria-expanded="${expanded}" aria-controls="week-${building.id}">${icon(expanded ? config.icons.expandedArrow : config.icons.rowArrow)}</button></div></div><div class="schedule-container" id="week-${building.id}-container" ${expanded ? '' : 'hidden'}>${weeklyHours(building)}</div></article>`;
}
function mealPicker() {
  return `<section class="meal-picker" aria-labelledby="meal-heading"><h2 id="meal-heading">${escape(config.copy.meal)}</h2><div class="meals" role="group" aria-labelledby="meal-heading">${config.meals.map(meal => `<button type="button" class="meal-button" data-action="meal" data-value="${meal.id}" aria-pressed="${state.meal === meal.id}">${escape(meal.label)}</button>`).join('')}</div></section>`;
}
function menuCard(building) {
  const stations = menus[building.id]?.[state.meal];
  return `<article class="menu-card" data-building="${building.id}" data-status="${building.status}"><div class="menu-heading"><h2>${escape(building.name)}</h2>${badge(building)}</div>${stations?.length ? `<div class="stations">${stations.map(station => {
    const midpoint = Math.ceil(station.items.length / 2);
    const columns = station.items.length > 1 ? [station.items.slice(0, midpoint),station.items.slice(midpoint)] : [station.items];
    return `<section class="station"><h3>${escape(station.name)}</h3><div class="menu-items">${columns.map(items => `<ul>${items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>`).join('')}</div></section>`;
  }).join('')}</div>` : `<p class="menu-unavailable">${escape(config.copy.noMenu)}</p>`}</article>`;
}
function emptyState() {
  return `<div class="empty-state"><h3>${escape(config.copy.emptyTitle)}</h3><p>${escape(config.copy.emptyDescription)}</p><button type="button" class="text-button" data-action="filter" data-value="${config.defaultFilter}">${escape(config.copy.resetFilter)}</button></div>`;
}
function render(focusKey) {
  const navScroll = app.querySelector('.category-nav')?.scrollLeft || 0;
  const visible = filterBuildings(state.category, state.status);
  const isMenu = categoryFor(state.category).menus && state.view === 'menu';
  app.innerHTML = `${masthead()}<main>${toolbar()}<div class="page-content">${isMenu ? mealPicker() : ''}<div class="${isMenu ? 'menu-list' : 'building-list'}">${visible.length ? visible.map(isMenu ? menuCard : buildingRow).join('') : emptyState()}</div></div><p class="prototype-note">${escape(config.copy.prototypeNote)}</p></main>`;
  const nav = app.querySelector('.category-nav');
  nav.scrollLeft = navScroll;
  if (focusKey) {
    const target = focusKey.id ? document.getElementById(focusKey.id) : app.querySelector(`[data-action="${focusKey.action}"][data-value="${focusKey.value}"]`);
    target?.focus({ preventScroll:true });
  }
  document.title = config.title;
}
function motionSettings() {
  const tokens = getComputedStyle(document.documentElement);
  return { duration:parseFloat(tokens.getPropertyValue('--motion-duration')), easing:tokens.getPropertyValue('--motion-easing').trim() };
}
function update(patch, focusKey, animate = true) {
  interactionVersion++;
  scheduleTransition?.cancel();
  currentTransition?.skipTransition();
  state = { ...state, ...patch };
  history.pushState(null, '', searchFromState(state));
  const commit = () => render(focusKey);
  if (animate && !reducedMotion.matches && document.startViewTransition) {
    currentTransition = document.startViewTransition(commit);
    currentTransition.ready.catch(() => {});
  } else {
    commit();
    if (animate && !reducedMotion.matches) app.querySelector('.page-content').animate([{opacity:0},{opacity:1}], motionSettings());
  }
  announcement.textContent = text('results', { count:filterBuildings(state.category, state.status).length });
}
async function toggleSchedule(value, focus) {
  const version = ++interactionVersion;
  scheduleTransition?.cancel();
  const previous = state.expanded;
  const expanded = previous === value ? null : value;
  const oldPanel = previous && document.getElementById(`week-${previous}-container`);
  if (!reducedMotion.matches && oldPanel) {
    scheduleTransition = oldPanel.animate([{height:`${oldPanel.scrollHeight}px`,opacity:1},{height:'0px',opacity:0}], { ...motionSettings(), fill:'forwards' });
    await scheduleTransition.finished.catch(() => {});
    if (version !== interactionVersion) return;
  }
  update({ expanded }, focus, false);
  const panel = expanded && document.getElementById(`week-${expanded}-container`);
  if (!reducedMotion.matches && panel) scheduleTransition = panel.animate([{height:'0px',opacity:0},{height:`${panel.scrollHeight}px`,opacity:1}], motionSettings());
}
app.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const { action, value } = button.dataset;
  const focus = { action, value };
  if (action === 'category') update({ category:value, view:config.defaultView, expanded:null }, focus);
  if (action === 'view') update({ view:value, expanded:null }, focus);
  if (action === 'meal') update({ meal:value }, focus);
  if (action === 'filter') update({ status:value, expanded:null }, { id:'status-filter' });
  if (action === 'expand') void toggleSchedule(value, focus);
  if (action === 'vote') {
    const building = buildings.find(item => item.id === value);
    if (!canVote(building)) return;
    const removed = votes.has(value);
    if (removed) votes.delete(value); else votes.add(value);
    render(focus);
    announcement.textContent = text(removed ? 'voteRemoved' : 'voteAdded', { name:building.name });
  }
});
app.addEventListener('change', event => {
  if (event.target.id === 'status-filter') update({ status:event.target.value, expanded:null }, { id:'status-filter' });
});
window.addEventListener('popstate', () => {
  interactionVersion++;
  scheduleTransition?.cancel();
  currentTransition?.skipTransition();
  state = stateFromSearch(location.search);
  render();
});
render();

// Progressive enhancement: the same navigation action for supported agent browsers.
if (document.modelContext?.registerTool) {
  const lifecycle = new AbortController();
  window.addEventListener('pagehide', () => lifecycle.abort(), { once:true });
  try {
    Promise.resolve(document.modelContext.registerTool({
      name:'filter_campus_buildings',
      title:'Filter campus buildings',
      description:'Navigate to a campus category and filter its sample building hours by status.',
      inputSchema:{
        type:'object',
        properties:{
          category:{type:'string',enum:config.categories.map(item => item.id)},
          status:{type:'string',enum:config.filters.map(item => item.id)}
        },
        required:['category','status'],
        additionalProperties:false
      },
      annotations:{readOnlyHint:false,untrustedContentHint:false},
      execute(input) {
        if (!input || !categoryFor(input.category) || !config.filters.some(item => item.id === input.status) || Object.keys(input).some(key => !['category','status'].includes(key))) throw new Error('Invalid category or status');
        update({category:input.category,status:input.status,view:config.defaultView,expanded:null}, null, false);
        return { category:state.category, status:state.status, buildings:filterBuildings(state.category,state.status).map(({id,name,status}) => ({id,name,status})) };
      }
    }, { signal:lifecycle.signal })).catch(() => {});
  } catch { /* Unsupported or unavailable experimental browser API. */ }
}
