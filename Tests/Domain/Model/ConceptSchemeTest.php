<?php

/***************************************************************
*  Copyright notice
*
*  (c) 2011 Jochen Rau <jochen.rau@typoplanet.de>, typoplanet
*  			
*  All rights reserved
*
*  This script is part of the TYPO3 project. The TYPO3 project is
*  free software; you can redistribute it and/or modify
*  it under the terms of the GNU General Public License as published by
*  the Free Software Foundation; either version 2 of the License, or
*  (at your option) any later version.
*
*  The GNU General Public License can be found at
*  http://www.gnu.org/copyleft/gpl.html.
*
*  This script is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*
*  This copyright notice MUST APPEAR in all copies of the script!
***************************************************************/

/**
 * Testcase for class Tx_Taxonomy_Domain_Model_ConceptScheme.
 *
 * @version $Id$
 * @copyright Copyright belongs to the respective authors
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 *
 * @package TYPO3
 * @subpackage Taxonomy
 * 
 * @author Jochen Rau <jochen.rau@typoplanet.de>
 */
class Tx_Taxonomy_Domain_Model_ConceptSchemeTest extends Tx_Extbase_Tests_Unit_BaseTestCase {
	/**
	 * @var Tx_Taxonomy_Domain_Model_ConceptScheme
	 */
	protected $fixture;

	public function setUp() {
		$this->fixture = new Tx_Taxonomy_Domain_Model_ConceptScheme();
	}

	public function tearDown() {
		unset($this->fixture);
	}
	
	
	/**
	 * @test
	 */
	public function getConceptsReturnsInitialValueForObjectStorageContainingTx_Taxonomy_Domain_Model_Concept() { 
		$newObjectStorage = new Tx_Extbase_Persistence_ObjectStorage();
		$this->assertEquals(
			$newObjectStorage,
			$this->fixture->getConcepts()
		);
	}

	/**
	 * @test
	 */
	public function setConceptsForObjectStorageContainingTx_Taxonomy_Domain_Model_ConceptSetsConcepts() { 
		$concept = new Tx_Taxonomy_Domain_Model_Concept();
		$objectStorageHoldingExactlyOneConcepts = new Tx_Extbase_Persistence_ObjectStorage();
		$objectStorageHoldingExactlyOneConcepts->attach($concept);
		$this->fixture->setConcepts($objectStorageHoldingExactlyOneConcepts);

		$this->assertSame(
			$objectStorageHoldingExactlyOneConcepts,
			$this->fixture->getConcepts()
		);
	}
	
	/**
	 * @test
	 */
	public function addConceptToObjectStorageHoldingConcepts() {
		$concept = new Tx_Taxonomy_Domain_Model_Concept();
		$objectStorageHoldingExactlyOneConcept = new Tx_Extbase_Persistence_ObjectStorage();
		$objectStorageHoldingExactlyOneConcept->attach($concept);
		$this->fixture->addConcept($concept);

		$this->assertEquals(
			$objectStorageHoldingExactlyOneConcept,
			$this->fixture->getConcepts()
		);
	}

	/**
	 * @test
	 */
	public function removeConceptFromObjectStorageHoldingConcepts() {
		$concept = new Tx_Taxonomy_Domain_Model_Concept();
		$localObjectStorage = new Tx_Extbase_Persistence_ObjectStorage();
		$localObjectStorage->attach($concept);
		$localObjectStorage->detach($concept);
		$this->fixture->addConcept($concept);
		$this->fixture->removeConcept($concept);

		$this->assertEquals(
			$localObjectStorage,
			$this->fixture->getConcepts()
		);
	}
	
}
?>