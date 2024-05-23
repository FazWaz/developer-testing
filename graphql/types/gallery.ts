import { objectType } from "nexus";

export const Gallery = objectType({
    name: "Gallery",
    definition(t) {
        t.string("id");
        t.string("url");
    },
})