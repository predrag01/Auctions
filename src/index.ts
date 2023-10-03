import { handleSerach } from "./logic/itemListLogic";
import { drawBiddingHistory, drawCenter } from "./view/itemDetailView";
import { drawItemList } from "./view/itemListView";

drawItemList();
handleSerach();
drawCenter();
drawBiddingHistory();