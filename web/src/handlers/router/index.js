import { createRouter, createWebHistory } from 'vue-router';
import index from '../../views/index.vue';
import allCases from '../../views/allCases.vue';
import newCases from '../../views/newCases.vue';

const routes = [
	{
		path: '/',
		name: 'Index',
		component: index,
		meta: {
			title: 'Covid Charts',
		},
	},
	{
		path: '/all',
		name: 'All Cases',
		component: allCases,
		meta: {
			title: 'Covid Charts | All Cases',
		},
	},
	{
		path: '/new',
		name: 'New Cases',
		component: newCases,
		meta: {
			title: 'Covid Charts | New Cases',
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior() {
		document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
	},
});

router.beforeEach((to, from, next) => {
	const nearestWithTitle = to.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.title);
	const nearestWithMeta = to.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.metaTags);
	const previousNearestWithMeta = from.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.metaTags);
	if (nearestWithTitle) {
		document.title = nearestWithTitle.meta.title;
	} else if (previousNearestWithMeta) {
		document.title = previousNearestWithMeta.meta.title;
	}
	Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map((el) => el.parentNode.removeChild(el));
	if (!nearestWithMeta) return next();
	nearestWithMeta.meta.metaTags
		.map((tagDef) => {
			const tag = document.createElement('meta');
			Object.keys(tagDef).forEach((key) => {
				tag.setAttribute(key, tagDef[key]);
			});
			tag.setAttribute('data-vue-router-controlled', '');
			return tag;
		})
		.forEach((tag) => document.head.appendChild(tag));
	next();
});
export default router;
