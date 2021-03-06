package com.emc.rpsp.fal.commons;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.util.HashSet;

@Data
@NoArgsConstructor
@AllArgsConstructor
@XmlRootElement
@XmlType(name = "ArrayResourcePoolSupportedTiers")
public class ArrayResourcePoolSupportedTiers {

    private HashSet<ArrayResourcePoolSupportedTier> resourcePoolTier;
}
