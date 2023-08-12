import { payloadChecker } from "../../middleware/payloadChecker.js";

export default class recipeMapper {
  // Purpose: To restructure data pulled from Spoonacular API into format that is expected by frontend
  // The expected format:
  // {
  //   recipe_id: String ( Id of the Recipe ),
  //   title: String ( Name of the Recipe ),
  //   description String ( Summary of the Recipe ),
  //   image: String ( Image URI of the Recipe ),
  //   tags: [ String ] ( Tags of the Recipe; cuisine etc. ),
  //   time: Float ( Approx. Prep Time of Recipe ),
  //   nutrition: [ Object ] ( Nutrition of Recipe ),
  //   ingredient: [ Object ] ( Ingredient of Recipe ),
  //   steps: [ String ] ( Cooking steps of Recipe )
  // }
  static regex_removeHTMLSyntax = /<\/?[^>]+>/g;

  static #tags_attributes = [ 'cuisines', 'dishTypes', 'occasions', 'diets' ];

  static createPipeline = ( pipeline ) => {
    if( payloadChecker.typeChecker( false, pipeline.attributes, 'null' ) || payloadChecker.typeChecker( false, pipeline.data, 'null' ) )
      throw new Error('Invalid pipeline data-type. Recommend to call init( data ).');

    let parentPipeline = pipeline;

    parentPipeline.get = () => {
      return parentPipeline.data.data.recipes.map( item => {
        let result = new Object();

        for( const attribute in parentPipeline.attributes )
          result[ attribute ] = parentPipeline.attributes[ attribute ]( item )
        
        return result;
      })
    };

    parentPipeline.id = () => {
      parentPipeline.attributes.id = ({ id }) => ( id );

      return this.createPipeline( parentPipeline );
    }

    parentPipeline.title = () => {
      parentPipeline.attributes.title = ({ title }) => ( title );

      return this.createPipeline( parentPipeline );
    }

    parentPipeline.description = () => {
      parentPipeline.attributes.description = ({ summary }) => {
        const removedSpaces = summary.trim();
        const removedHTMLSyntax = removedSpaces.replace( this.regex_removeHTMLSyntax );
        const selectFirstSentence = removedHTMLSyntax.split( '.' ).at( 0 );

        return selectFirstSentence;
      };

      return this.createPipeline( parentPipeline );
    }

    parentPipeline.image = () => {
      parentPipeline.attributes.image = ({ image }) => ( image );

      return this.createPipeline( parentPipeline );
    }

    parentPipeline.tags = () => {
      parentPipeline.attributes.tags = ( item ) => {
        const tags = new Array();

        for( const tagElement of this.#tags_attributes ) {
          tags.push( ...item[ tagElement ] );
        }

        return tags;
      }

      return this.createPipeline( parentPipeline );
    }

    parentPipeline.time = () => {
      parentPipeline.attributes.time = ({ time }) => ( time );

      return this.createPipeline( parentPipeline );
    }

    return parentPipeline;
  }

  static init = ( data ) => this.createPipeline( { data: data, attributes: new Object() } );
}