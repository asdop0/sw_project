package com.asd.repository;

import java.util.List;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.asd.model.CampingElasticsearch;

public interface CampingElasticsearchRepository extends ElasticsearchRepository<CampingElasticsearch, Long> {

	@Query("{\"multi_match\": {\"query\": \"?0\", \"fields\": [\"name\", \"address\"], \"fuzziness\": \"AUTO\"}}")
	List<CampingElasticsearch> searchByMultiMatch(String search);

}
