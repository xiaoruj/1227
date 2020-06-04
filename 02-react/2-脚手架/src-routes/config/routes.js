import Timeline from "../pages/Timeline";
import Frontend from "../pages/Timeline/components/Frontend";
import Backend from "../pages/Timeline/components/Backend";
import Pins from "../pages/Pins";
import Following from "../pages/Pins/components/Following";
import Hot from "../pages/Pins/components/Hot";
import Books from "../pages/Books";
import Mobile from "../pages/Books/components/Mobile";
import BlockChain from "../pages/Books/components/BlockChain";
const routes = [
  {
    path: "/timeline",
    components: Timeline,
    name: "首页",
    children: [
      {
        path: "/timeline/frontend",
        components: Frontend,
        name: "前端",
      },
      {
        path: "/timeline/backend",
        components: Backend,
        name: "后端",
      },
    ],
  },
  {
    path: "/pins",
    components: Pins,
    name: "沸点",
    children: [
      {
        path: "/pins/following",
        components: Following,
        name: "关注",
      },
      {
        path: "/pins/hot",
        components: Hot,
        name: "热门",
      },
    ],
  },
  {
    path: "/books",
    components: Books,
    name: "小册",
    children: [
      {
        path: "/books/mobile",
        components: Mobile,
        name: "移动开发",
      },
      {
        path: "/books/blockchain",
        components: BlockChain,
        name: "区块链",
      },
    ],
  },
];
export default routes;
