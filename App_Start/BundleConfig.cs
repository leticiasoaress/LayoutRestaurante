using System.Web;
using System.Web.Optimization;
using BundleTransformer.Core.Resolvers;
using BundleTransformer.Core.Transformers;
using BundleTransformer.Core.Builders;
using BundleTransformer.Core.Orderers;

namespace LayoutRestaurante
{
    public class BundleConfig
    {
        // Para obter mais informações sobre o agrupamento, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.UseCdn = true;

            NullBuilder nullBuilder = new NullBuilder();
            StyleTransformer styleTransformer = new StyleTransformer();
            ScriptTransformer scriptTransformer = new ScriptTransformer();
            NullOrderer nullOrderer = new NullOrderer();

            // Replace a default bundle resolver in order to the debugging HTTP-handler
            // can use transformations of the corresponding bundle
            BundleResolver.Current = new CustomBundleResolver();

            //Styles
            var bundleContent = new StyleBundle("~/Content/css");
            bundleContent.Include(
                  "~/Content/bootstrap.css",
                  "~/Content/site.css");
            bundleContent.Builder = nullBuilder;
            bundleContent.Transforms.Add(styleTransformer);
            bundleContent.Orderer = nullOrderer;
            bundles.Add(bundleContent);

            var bundleJQuery = new ScriptBundle("~/bundles/jquery");
            bundleJQuery.Include(
                    "~/Scripts/Template/plugins/jquery/jquery.min.js",
                    "~/Scripts/Template/plugins/jquery/jquery-ui.min.js");
            bundleJQuery.Builder = nullBuilder;
            bundleJQuery.Transforms.Add(scriptTransformer);
            bundleJQuery.Orderer = nullOrderer;
            bundles.Add(bundleJQuery);

            var bundleBootstrap = new ScriptBundle("~/bundles/bootstrap");
            bundleBootstrap.Include(
                     "~/Scripts/Template/plugins/bootstrap/bootstrap.min.js",
                     "~/Scripts/respond.min.js");
            bundleBootstrap.Builder = nullBuilder;
            bundleBootstrap.Transforms.Add(scriptTransformer);
            bundleBootstrap.Orderer = nullOrderer;
            bundles.Add(bundleBootstrap);

            var bundleApp = new ScriptBundle("~/bundles/App");
            bundleApp.Include(
                                "~/Scripts/Template/plugins/icheck/icheck.min.js",
                                "~/Scripts/Template/settings.js",
                                "~/Scripts/Template/plugins.js",
                                "~/Scripts/Template/actions.js",
                                "~/Scripts/Template/plugins/mcustomscrollbar/jquery.mCustomScrollbar.min.js",
                                "~/Scripts/Template/plugins/smartwizard/jquery.smartWizard-2.0.min.js",
                                "~/Scripts/Template/plugins/moment.min.js",
                                "~/Scripts/Template/plugins/fullcalendar/fullcalendar.min.js",
                                "~/Scripts/Template/plugins/fullcalendar/lang/pt-br.js",
                                "~/Scripts/Template/plugins/noty/jquery.noty.js",
                                "~/Scripts/Template/plugins/noty/layouts/bottomRight.js",
                                "~/Scripts/Template/plugins/noty/layouts/center.js",
                                "~/Scripts/Template/plugins/noty/layouts/top.js",
                                "~/Scripts/Template/plugins/noty/themes/default.js",
                                "~/Scripts/Template/plugins/jquery-mask/jquery.mask.js",
                                "~/Scripts/Template/plugins/jquery-maskmoney/jquery.maskMoney.js",
                                "~/Scripts/Template/plugins/summernote/summernote.js",
                                "~/Scripts/Template/plugins/bootstrap/bootstrap-datepicker.js",
                                "~/Scripts/Template/plugins/bootstrap/bootstrap-timepicker.min.js",
                                "~/Scripts/Template/plugins/owl/owl.carousel.min.js",
                                "~/Scripts/Template/plugins/treeview/tree-custom.min.js",
                                "~/Scripts/Template/plugins/datatables/jquery.dataTables.min.js",
                                "~/Scripts/Template/plugins/bootstrap/bootstrap-select.js",
                                "~/Scripts/Template/plugins/morris/raphael-min.js",
                                "~/Scripts/Template/plugins/morris/morris.min.js",
                                "~/Scripts/Template/plugins/jquery-confirm/jquery-confirm.min.js",
                                 "~/Scripts/Template/plugins/form-builder/form-builder.min.js",
                                "~/Scripts/Template/plugins/form-builder/demo.js",
                                "~/Scripts/Restaurante.js");
            bundleApp.Builder = nullBuilder;
            bundleApp.Transforms.Add(scriptTransformer);
            bundleApp.Orderer = nullOrderer;
            bundles.Add(bundleApp);

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));
        }
    }
}
