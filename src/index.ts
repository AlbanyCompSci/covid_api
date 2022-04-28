import './env';
import app from './server';

const port = Number(process.env.PORT || 3000);
const server = app.listen(port, () => {
	console.log('api proxy started on: ' + port);
});

export default server;
