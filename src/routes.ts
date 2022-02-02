import { Router } from "express";
import { ensureClientAuthentication } from "./middlewares/ensureClientAuthentication";
import { ensureDeliverymanAuthentication } from "./middlewares/ensureDeliverymanAuthentication";
import { AuthenticateClientController } from "./modules/account/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/findAllDeliveries/FindAllDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveries/useCases/updateEndDate/UpdateEndDateController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliveriesController as FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesController = new FindAllDeliveriesController();
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController();
const updateEndDateController = new UpdateEndDateController();

routes.post("/client", createClientController.handle);
routes.post("/client/authenticate", authenticateClientController.handle);
routes.get("/client/delivery", ensureClientAuthentication, findAllDeliveriesController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle);
routes.get("/deliveryman/delivery", ensureDeliverymanAuthentication, findAllDeliveriesDeliverymanController.handle);
routes.post("/delivery", ensureClientAuthentication, createDeliveryController.handle);
routes.get("/delivery/available", ensureDeliverymanAuthentication, findAllAvailableController.handle);
routes.put("/delivery/update-deliveryman/:id", ensureDeliverymanAuthentication, updateDeliverymanController.handle);
routes.put("/delivery/update-end-date/:id", ensureDeliverymanAuthentication, updateEndDateController.handle);

export { routes };