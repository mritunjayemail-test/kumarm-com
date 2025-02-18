
// Author : Kavindu Yasintha Silva

// Import the core angular services.
import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnChanges, OnInit} from "@angular/core";
import { Component } from "@angular/core";


// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// CAUTION: The value bound this component is ASSUMED to be the result of a JSON.parse()
// call. As such, it does NOT SUPPORT the full set of JavaScript data-types. Instead, it
// only supports those that can be encoded in a JSON payload.
type ValueType =
  | "Null"
  | "String"
  | "Number"
  | "Boolean"
  | "Array"
  | "Object"
  ;

interface CollapsedEntries {
  [ key: string ]: boolean;
}

@Component({
  selector: "app-json-to-table",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [ "./json-to-table.component.scss" ],
  templateUrl: "./json-to-table.component.html"
})
export class JsonToTableComponent  implements OnChanges {
  public collapsedEntries: CollapsedEntries;
  public entryCount: number;
  public isCollapsed: boolean;
  @Input() value: any;
  public valueType: ValueType;

  // I initialize the json tree component.
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.collapsedEntries = Object.create( null );
    this.entryCount = 0;
    this.isCollapsed = false;
    this.value =  ""
    this.valueType = this.calculateType( this.value );
    // this.changeDetectorRef.detectChanges()
  }


  // ---
  // PUBLIC METHODS.
  // ---

  // I calculate the Type for the given value.
  public calculateType( target: any ) : ValueType {

    if ( target === null ) {

      return( "Null" );

    }

    if ( typeof( target ) === "string" ) {

      return( "String" );

    }

    if ( typeof( target ) === "number" ) {

      return( "Number" );

    }

    if ( typeof( target ) === "boolean" ) {

      return( "Boolean" );

    }

    if ( Array.isArray( target ) ) {

      return( "Array" );

    }

    return( "Object" );

  }


  // I get called when the input bindings have been updated.
  public ngOnChanges() : void {

    this.entryCount = 0;
    this.isCollapsed = false;
    this.valueType = this.calculateType( this.value );
    this.clearCollapsedEntries();

    if ( this.valueType === undefined ) {

      //this.entryCount = Object.keys( this.value ).length;

    }
    else if ( this.valueType === null ) {

      //this.entryCount = Object.keys( this.value ).length;

    }
    else if ( this.valueType === "Object" ) {

      //this.entryCount = Object.keys( this.value ).length;

    } else if ( this.valueType === "Array" ) {

      this.entryCount = this.value.length;

    }

  }


  // I attempt to parse the current String value as a JSON payload.
  // --
  // NOTE: This overrides the passed-in state at this point in the JSON Tree.
  public parseString( event: any ) : void {


    if ( ! event.metaKey ) {

      return;

    }



    try {

      this.value = JSON.parse( this.value );
      this.ngOnChanges();

      console.group( "String Parsing" );
      console.log( "The value was successfully parsed as JSON." );
      console.log( this.value );
      console.groupEnd();

    } catch ( error ) {

      console.group( "String Parsing" );
      console.warn( "The value could not be parsed as JSON." );
      console.error( error );
      console.log( this.value );
      console.groupEnd();

    }

  }


  // I toggle the expansion of the given value.
  public toggle( index?: string | number ) : void {

    // Top-level toggle.
    if ( index === undefined ) {

      this.isCollapsed = ! this.isCollapsed;

      // If we're collapsing the top-level value, then reset any settings for the
      // sub-entry visibility.
      if ( this.isCollapsed ) {

        this.clearCollapsedEntries();

      }

      // Sub-entry toggle.
    } else {

      this.collapsedEntries[ index ] = ! this.collapsedEntries[ index ];

    }

  }

  // ---
  // PRIVATE METHODS.
  // ---

  // I clear the collapsed entries index.
  private clearCollapsedEntries() : void {

    for ( var key in this.collapsedEntries ) {

      delete( this.collapsedEntries[ key ] );

    }

  }



  updateData(apiResponse:any):void{
    this.collapsedEntries = Object.create( null );
    this.entryCount = 0;
    this.isCollapsed = false;
    this.value =  apiResponse
    console.log(this.value );
    this.valueType = this.calculateType( this.value );
    // this.changeDetectorRef.detectChanges()

  }
  assertStringKey(key: unknown): string {
    return key as string;
  }



}
