import "reflect-metadata";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { bindings } from "./inversify.config";
import * as bodyParser from 'body-parser';
import * as cors from "cors";

(async () => {

    const port = process.env.APP_ENV === 'e2e' ? 3002 : 3001;
    const container = new Container();
    await container.loadAsync(bindings);
    const app = new InversifyExpressServer(container);
    app.setConfig((app) => {
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
        app.use(cors());
    });
    const server = app.build();

    server.listen(port, () => {
        console.log(`Server running at http://127.0.0.1:${port}/`)
    });

})();
