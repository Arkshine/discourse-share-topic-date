import { apiInitializer } from "discourse/lib/api";
import discourseComputed from "discourse-common/utils/decorators";

function longDateNoYearWithSeconds(dt) {
  if (!dt) {
    return;
  }

  if (new Date().getFullYear() !== dt.getFullYear()) {
    return moment(dt).format(settings.share_topic_date_with_year_format);
  } else {
    return moment(dt).format(settings.share_topic_date_without_year_format);
  }
}

export default apiInitializer("1.8.0", (api) => {
  api.modifyClass("component:modal/share-topic", {
    pluginId: "share-topic",
    @discourseComputed("post.created_at", "post.wiki", "post.last_wiki_edit")
    displayDate(createdAt, wiki, lastWikiEdit) {
      const date = wiki && lastWikiEdit ? lastWikiEdit : createdAt;
      return longDateNoYearWithSeconds(new Date(date));
    },
  });
});
