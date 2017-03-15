var browserSync=require('browser-sync');

browserSync({
	server:"app",
	files:["app/*.html", "app/*.css", "app/api/*.json", "app/js/*.js"]
})