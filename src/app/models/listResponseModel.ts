import { ResponseModel } from "./ResponseModel";

export interface listResponseModel<T> extends ResponseModel{
    data: T[];
}
// normakl ... response modeldeki gibi bunlarin bir üst seviyesinde reponse model var onu da yazalim sonra import edelim

