package com.asd.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.asd.model.Camping;
import com.asd.model.CampingElasticsearch;
import com.asd.repository.CampingElasticsearchRepository;
import com.asd.service.CampingService;

import jakarta.persistence.EntityListeners;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostUpdate;

@Component
@EntityListeners(CampingListener.class)
public class CampingListener {
    
    private final CampingElasticsearchRepository campingElasticsearchRepository;
    private Logger logger = LoggerFactory.getLogger(CampingListener.class);

    public CampingListener(CampingElasticsearchRepository campingElasticsearchRepository) {
        this.campingElasticsearchRepository = campingElasticsearchRepository;
    }

    @PostPersist
    @PostUpdate
    public void syncToElasticsearch(Camping camping) {
    	logger.info("syncToElasticsearch 실행");
        CampingElasticsearch campingElasticsearch = new CampingElasticsearch();
        campingElasticsearch.setId(camping.getId());
        campingElasticsearch.setName(camping.getName());
        campingElasticsearch.setAddress(camping.getAddress());
        campingElasticsearch.setLatitude(camping.getLatitude());
        campingElasticsearch.setLongitude(camping.getLongitude());
        campingElasticsearch.setWriteDate(camping.getWriteDate());

        campingElasticsearchRepository.save(campingElasticsearch);
    }
}
