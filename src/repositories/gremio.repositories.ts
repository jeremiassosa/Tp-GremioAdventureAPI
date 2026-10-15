
import type * as GremioTypes from "../types/gremio"
import {Gremios as GremioModel} from "../models/Index"

export async function getGremioByID(id: number): Promise<GremioTypes.Gremio | null> {
    const row = await GremioModel.findByPk(id);
    return row ? row.toJSON() : null;
}
