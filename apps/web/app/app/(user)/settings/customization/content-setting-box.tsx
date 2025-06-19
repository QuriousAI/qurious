import { Button } from "@workspace/ui/src/components/button";
import { Label } from "@workspace/ui/src/components/label";
import { Textarea } from "@workspace/ui/src/components/textarea";
import { Trash2 } from "@workspace/ui/src/iconography";
// import { InformationToolTip } from "@/components/information-tooltip";
import {
  useDeleteAllFoldersMutation,
  useDeleteAllSearchesMutation,
} from "@/queries";
import { ToastPromise } from "@/utils/toast";
import { InformationToolTip } from "../../../../components/heading/info-tooltip";

export const ContentSettingsBox = () => {
  // Placeholder for Summary Settings input
  const summarySettingsPlaceholder = `e.g. Concise summary highlighting main results and conclusions\ne.g. Focus on statistical findings and key takeaways\ne.g. Summarize methods in detail, skip introduction\ne.g. Bullet-point format with links to cited studies`;

  // Placeholder for User Information input
  const userInfoPlaceholder = `e.g. PhD student in neuroscience, interested in cognitive bias and decision-making\ne.g. Clinical researcher focusing on oncology trials and drug efficacy\ne.g. Machine learning enthusiast with a background in economics\ne.g. Masters in sociology, looking for papers on behavioral trends`;

  return (
    <div className="flex flex-col gap-8 rounded-md border bg-card p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Label>Summary Settings</Label>
          <InformationToolTip content="Choose how detailed and personalized you'd like your summaries to be." />
        </div>
        <Textarea
          className="w-full resize-none"
          placeholder={summarySettingsPlaceholder}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Label>User Information</Label>
          <InformationToolTip content="Tell us a bit about yourself to improve your experience (e.g., field of study, role, interests)." />
        </div>
        <Textarea
          className="w-full resize-none"
          placeholder={userInfoPlaceholder}
        />
      </div>

      <div className="flex gap-4">
        {/* <DeleteSearchHistoryButton />
        <DeleteAllFoldersButton /> */}
      </div>
    </div>
  );
};
