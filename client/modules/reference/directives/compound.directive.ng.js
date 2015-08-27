angular
    .module('ethdev')
    .directive('compound', compound);

function compound($compile, $templateCache) {

    return {
        restrict: 'E',
        scope: {
            parser: '=',
            body: "="
        },
        link: function (scope, element, attrs) {

            switch(scope.parser) {

                case 'jsdoc':
                    element.append(createJsdocCompounds(scope));
                    break;

                case 'markdown':
                    element.append(createMarkdownCompounds(scope));
                    break;

            }

        }

    };

    function createMarkdownCompounds(scope) {

        var $mdBlock = $('<div></div>');
        $mdBlock.html(scope.body.content);
        return $mdBlock;

    }

    function createJsdocCompounds(scope) {

        var $sections = $('<div></div>');

        // TODO: sort compounds appropriately
        var sortedCompounds = scope.body;

        _.forEach(sortedCompounds, function(value, key){

            var $section = $('<section class="compound"></section>');

            switch(key) {

                case 'properties':
                    scope.properties = value;
                    $section.addClass('compound-properties');
                    $section.append($compile(
                        $templateCache.get('client/components/compounds/views/properties.ng.html')
                    )(scope));
                    break;

                case 'params':
                    scope.params = value;
                    $section.addClass('compound-params');
                    $section.append($compile(
                        $templateCache.get('client/components/compounds/views/params.ng.html')
                    )(scope));
                    break;

                case 'returns':
                    scope.returns = value;
                    $section.addClass('compound-returns');
                    $section.append($compile(
                        $templateCache.get('client/components/compounds/views/returns.ng.html')
                    )(scope));
                    break;

                case 'examples':
                    scope.examples = value;
                    $section.addClass('compound-examples');
                    $section.append($compile(
                        $templateCache.get('client/components/compounds/views/examples.ng.html')
                    )(scope));
                    break;

                // TODO: process internal links
                case 'description':
                    scope.description = value;
                    $section.addClass('compound-description');
                    $section.append($compile(
                        $templateCache.get('client/components/compounds/views/description.ng.html')
                    )(scope));
                    break;

                case 'id':
                case 'name':
                case 'longname':
                case 'kind':
                case 'scope':
                case 'order':
                case 'deprecated':
                    // Do nothing
                    break;

                default:
                    console.log('No template for: ' + key);
                    return;

            }

            $sections.append($section);

        });

        return $sections;

    }

}
