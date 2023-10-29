import { withPluginApi } from "discourse/lib/plugin-api";
import { h } from "virtual-dom";

function initWithApi(api) {
  api.reopenWidget("post-meta-data", {
    html(attrs) {
      const infos = this._super(...arguments);

      const postInfosIdx = infos.findIndex(i => {
        return i.properties && i.properties.className == "post-infos";
      });

      if (postInfosIdx < 0) return infos;

      const childs = infos[postInfosIdx].children || [];
      const postDateIdx = childs.findIndex(i => {
        return Object.getPrototypeOf(i) && Object.getPrototypeOf(i).tagName && Object.getPrototypeOf(i).tagName == "div.post-info.post-date";
      });

      if (postDateIdx < 0) return infos;

      const post_number = attrs.post_number;
      const views = h(
        "div.post-number-indicator",
        {
          title: I18n.t(themePrefix("views"), { num: post_number })
        },
        [post_number]
      );

      childs.insertAt(postDateIdx, views);

      infos[postInfosIdx].children = childs;

      return infos;
    }
  });
}

export default {
  name: "post-number-indicator-theme",

  initialize() {
    withPluginApi("0.8.7", initWithApi);
  }
};
