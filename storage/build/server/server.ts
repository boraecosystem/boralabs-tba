import * as Koa from 'koa';
import * as Static from 'koa-static';
import * as Mount from 'koa-mount';
import * as Cors from 'koa-cors';
import * as path from "path";

const app = new Koa();
const resolver = new Koa();

function setMeta(name: string, image: string) {
    return {
        attributes: null,
        background_color: null,
        description: name,
        image: `http://localhost:3000/static/${image}`,
        name,
    }
}

app.use(Cors());
app.use(Mount('/static', Static(path.join(__dirname + '/assets/swipe'))));
app.use(async ctx => {
    const chunk = ctx.request.path.split('/')
    let metadata;
    if (chunk.length === 5) {
        if (chunk[2] === 'nft') {
            const nid = Number(chunk[4])
            switch (nid) {
                case 1000:
                    metadata = setMeta('Baseman', 'img-3.webp')
                    break;
                case 1001:
                    metadata = setMeta('Pitcher', 'img-1.webp')
                    break;
                case 1002:
                    metadata = setMeta('Batter', 'img-2.webp')
                    break;
                default:
                    break;
            }
        } else if (chunk[2] === 'sft') {
            const sid = Number(chunk[4])
            switch (sid) {
                case 1000:
                    metadata = setMeta('Bat&Ball', 'img-8.webp')
                    break;
                case 1001:
                    metadata = setMeta('Ball', 'img-4.webp')
                    break;
                case 1002:
                    metadata = setMeta('Cap', 'img-5.webp')
                    break;
                case 1003:
                    metadata = setMeta('Globe', 'img-6.webp')
                    break;
                case 1004:
                    metadata = setMeta('Guard', 'img-7.webp')
                    break;
                default:
                    break;
            }
        }
    }
    console.log(metadata)
    if (metadata) {
        ctx.body = metadata
    }
});

app.listen(3000);
